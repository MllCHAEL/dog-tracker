using System.Net;
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
        public HttpResponseData Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequestData req)
        {
            // TODO: Update log message to be accurate / function-specific
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            // TODO: Return actual dog list from CosmosDB (note: return below likely to change)

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            response.WriteString("Welcome to Azure Functions!");

            return response;
        }
    }
}
