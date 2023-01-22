using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace dog_tracker_back_end
{
    public class DeleteDog
    {
        private readonly ILogger _logger;

        public DeleteDog(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<DeleteDog>();
        }

        [Function("DeleteDog")]
        // TODO: Update method use and work with "delete" (instead of "post")
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

            await cosmosContainer.DeleteItemAsync<Dog>(newDog.id, new PartitionKey(newDog.id));

            // TODO: Finalise return value (i.e. potentially add headers - e.g. Content-Type)
            return new OkObjectResult(newDog);
        }
    }
}
