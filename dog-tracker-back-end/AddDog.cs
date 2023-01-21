using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

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
        // TODO: Convert to just POST
        public async Task<IActionResult> RunAsync([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req)
        {

            var cosmosDefaultUrl = "https://localhost:8081/";
            var cosmosDefaultKey = "CosmosDefaultKey"; // TODO: Don't reveal secret in source code
            CosmosClient cosmosClient = new CosmosClient(cosmosDefaultUrl, cosmosDefaultKey);

            var databaseName = "DogAppDatabase";
            var collectionName = "DogsListContainer";
            var cosmosContainer = cosmosClient.GetContainer(databaseName, collectionName);

            // TODO: Add actual dog from user input
            var newItem = new Dog
            {
                id = System.Guid.NewGuid().ToString(),
                name = "Add dog test",
                barksALot = true
            };

            var itemResponse = await cosmosContainer.CreateItemAsync(newItem);
            _logger.LogInformation("Uploading dog to CosmosDb");

            // TODO: Return actual dog list from CosmosDB after upload (note: return below likely to change) - Could also not occur in this Fn - Tbd
            return new OkObjectResult(newItem);
        }
    }
}
