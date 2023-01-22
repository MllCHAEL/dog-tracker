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
            var newDog = JsonConvert.DeserializeObject<Dog>(requestBody);

            var cosmosDefaultUrl = "https://localhost:8081/";
            var cosmosDefaultKey = "cosmosDefaultKey"; // TODO: Don't reveal secret in source code
            CosmosClient cosmosClient = new CosmosClient(cosmosDefaultUrl, cosmosDefaultKey);

            var databaseName = "DogAppDatabase";
            var collectionName = "DogsListContainer";
            var cosmosContainer = cosmosClient.GetContainer(databaseName, collectionName);

            newDog.id = System.Guid.NewGuid().ToString(); // TODO: Potentially initialise elsewhere (i.e. see if defaulting feesible)
            await cosmosContainer.CreateItemAsync(newDog);

            // TODO: Finalise return value (i.e. potentially add headers - e.g. Content-Type)
            return new OkObjectResult(newDog);
        }
    }
}
