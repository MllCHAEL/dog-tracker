using System.Net;
using Microsoft.AspNetCore.Mvc;
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

        public class Dog
        {
            public string name { get; set; } = null!;
            public bool barksALot { get; set; }

            public Dog(string name, bool barksALot)
            {
                this.name = name;
                this.barksALot = barksALot;
            }
        }

        [Function("AddDog")]
        // TODO: Convert to just POST
        public IActionResult Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req)
        {
            // TODO: Update log message to be accurate / function-specific
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            // TODO: Upload new dog to CosmosDB
            // TODO: Return actual dog list from CosmosDB after upload (note: return below likely to change)

            return new OkObjectResult(new Dog(name: "Roofas", barksALot: true));
        }
    }
}
