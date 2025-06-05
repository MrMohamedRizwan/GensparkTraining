using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace FirstAPI.Hubs
{
    public class NotificationHub : Hub
    {
        public async Task NotifyNewDocument(string fileName)
        {
            await Clients.All.SendAsync("ReceiveNotification", $"{fileName} uploaded");
        }
    }

}
