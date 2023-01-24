using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace dog_tracker_back_end
{
    public class GetDogs
    {
        private readonly ILogger _logger;

        public GetDogs(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<GetDogs>();
        }

        [Function("GetDogs")]
        public async Task<List<Dog>> RunAsync([HttpTrigger(AuthorizationLevel.Function, "get")] HttpRequestData req)
        {
            // TODO: Add helpful logging

            var cosmosDefaultUrl = "https://localhost:8081/";
            var cosmosDefaultKey = "cosmosDefaultKey"; // TODO: Don't reveal secret in source code
            CosmosClient cosmosClient = new CosmosClient(cosmosDefaultUrl, cosmosDefaultKey);

            var databaseName = "DogAppDatabase";
            var collectionName = "DogsListContainer";
            var cosmosContainer = cosmosClient.GetContainer(databaseName, collectionName);

            var allDogsQuery = cosmosContainer
                .GetItemLinqQueryable<Dog>(allowSynchronousQueryExecution: true);

            var allDogs = allDogsQuery.ToList();

            return allDogs;
        }
    }
}
