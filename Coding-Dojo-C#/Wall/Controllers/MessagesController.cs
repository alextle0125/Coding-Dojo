using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Wall.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Wall.Controllers
{
    public class MessagesController : Controller
    {
        private Context dbContext;
        
        public MessagesController(Context context)
        {
            dbContext = context;
        }

        [HttpGet("/Dashboard")]
        public IActionResult Dashboard()
        {
            if(HttpContext.Session.GetInt32("UserId") != null)
            {
            	User userInDb = dbContext.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("UserId"));

            	List<Message> AllMessages = dbContext.Messages
            												.Include(m => m.User)
            												.Include(m => m.Comments)
            												.ThenInclude(c => c.User)
            												.OrderByDescending(m => m.CreatedAt)
            												.ToList();

                ViewBag.CurrentUser = userInDb;
                ViewBag.CurrUserId = ViewBag.CurrentUser.UserId;
                ViewBag.AllMessages = AllMessages;

                return View();
            }
            else 
            {
                return View("~/Views/Home/Index.cshtml");
            }   
        }

        [HttpPost("/Message/PostMessage")]
        public IActionResult PostMessage(Message newMessage)
        {
        	if(ModelState.IsValid)
        	{
        		User userInDb = dbContext.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("UserId"));

        		newMessage.UserId = userInDb.UserId;

        		dbContext.Add(newMessage);
        		dbContext.SaveChanges();
        	}
        	return RedirectToAction("Dashboard");
        }

        [HttpPost("/Message/PostComment")]
        public IActionResult PostComment(Comment newComment)
        {
        	if(ModelState.IsValid)
        	{
        		User userInDb = dbContext.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("UserId"));

        		newComment.UserId = userInDb.UserId;
        		newComment.MessageId = Int32.Parse(Request.Form["messageId"]);

        		dbContext.Add(newComment);
        		dbContext.SaveChanges();
        	}
        	return RedirectToAction("Dashboard");
        }

        [HttpPost("/Message/{messageId}/Update")]
        public IActionResult UpdateMessage(string messageId)
        {
        	Message messageInDb = dbContext.Messages.FirstOrDefault(m => m.MessageId == Int32.Parse(messageId));

        	messageInDb.Content = Request.Form["content"];

        	dbContext.SaveChanges();

        	return RedirectToAction("Dashboard");
        }

        [HttpGet("/Message/{messageId}/Delete")]
        public IActionResult DeleteMessage(string messageId)
        {
        	Message messageInDb = dbContext.Messages.FirstOrDefault(m => m.MessageId == Int32.Parse(messageId));

        	dbContext.Messages.Remove(messageInDb);

        	dbContext.SaveChanges();

        	return RedirectToAction("Dashboard");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
