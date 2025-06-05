using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace FirstAPI.Hubs
{
    public class NotificationHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceivedMessage", user, message);
        }
    }
}
