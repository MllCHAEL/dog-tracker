using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace dog_tracker_back_end
{
    public class AddDog
    {
        private readonly ILogger _logger;

        public AddDog(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<AddDog>();
        }

        [Function("AddDog")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequestData req,
            ILogger logger)
        {
            // TODO: Add helpful logging

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var newDog = JsonConvert.DeserializeObject<NewDog>(requestBody);

            var cosmosDefaultUrl = "https://localhost:8081/";
            var cosmosDefaultKey = "cosmosDefaultKey"; // TODO: Don't reveal secret in source code
            CosmosClient cosmosClient = new CosmosClient(cosmosDefaultUrl, cosmosDefaultKey);

            var databaseName = "DogAppDatabase";
            var collectionName = "DogsListContainer";
            var cosmosContainer = cosmosClient.GetContainer(databaseName, collectionName);

            // Interview - Do not allow dogs with the same name to be saved to db
            // Note: Used .Count() below instead of .Any() due to known issue with unnested .Any() causing error
            var dogNameAvailable = cosmosContainer
                .GetItemLinqQueryable<Dog>(allowSynchronousQueryExecution: true).
                Count(dog => dog.name.ToUpper() == newDog.name.ToUpper()) == 0;

            if (dogNameAvailable)
            {
                var newDogWithId = new Dog(newDog.name, newDog.barksALot);
                await cosmosContainer.CreateItemAsync(newDogWithId);
                return new OkObjectResult(newDogWithId);
            }

            // TODO: Make sure TypeScript doesn't console log 'New dog x added' or call GetDogs AzFn to update table (as dog was not added)
            // TODO: Display dog name already taken on UI (for user's information)
            // TODO: Finalise return value (i.e. potentially add headers - e.g. Content-Type)
            return new BadRequestObjectResult("Dog name already taken");
        }
    }
}
