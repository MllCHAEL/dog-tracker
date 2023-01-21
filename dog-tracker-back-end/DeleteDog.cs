using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

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
        public HttpResponseData Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequestData req)
        {
            // TODO: Update log message to be accurate / function-specific
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            // TODO: Delete dog from cosmos db
            // TODO: Return actual dog list from CosmosDB after upload (note: return below likely to change)

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            response.WriteString("Welcome to Azure Functions!");

            return response;
        }
    }
}
