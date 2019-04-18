using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WeddingPlanner.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace WeddingPlanner.Controllers
{
    public class HomeController : Controller
    {
        private Context dbContext;
        
        public HomeController(Context context)
        {
            dbContext = context;
        }

        [HttpGet("")]
        public IActionResult Index()
        {
            if(HttpContext.Session.GetString("UserId") != null)
            {
                return RedirectToAction("WeddingsIndex");
            }
            else 
            {
                return View();
            }   
        }

        [HttpPost("Register")]
        public IActionResult Register(User newUser)
        {
            if(ModelState.IsValid)
            {
                PasswordHasher<User> Hasher = new PasswordHasher<User>();
                newUser.Password = Hasher.HashPassword(newUser, newUser.Password);
                dbContext.Add(newUser);
                dbContext.SaveChanges();
                
                HttpContext.Session.SetString("UserId", newUser.UserId.ToString());

                return RedirectToAction("WeddingsIndex");             
            }
            else 
            {
                return View("Index");
            }
        }

        [HttpPost("Login")]
        public IActionResult Login(LoginUser authenticateUser)
        {
            if(ModelState.IsValid)
            {
                User userInDb = dbContext.Users.FirstOrDefault(u => u.Email == authenticateUser.Email);

                if(userInDb == null){
                    ModelState.AddModelError("Email", "Invalid Email/Password");
                    return View("Index");
                }

                var hasher = new PasswordHasher<LoginUser>();

                var result = hasher.VerifyHashedPassword(authenticateUser, userInDb.Password, authenticateUser.Password);

                if(result == 0) 
                {
                    ModelState.AddModelError("Password", "Incorrect Password");
                    return View("Index");
                }
                else 
                {
                    HttpContext.Session.SetString("UserId", userInDb.UserId.ToString());
                    return RedirectToAction("WeddingsIndex");
                }
            }
            return View();
        }

        [HttpGet("weddings")]
        public IActionResult WeddingsIndex()
        {
            if(HttpContext.Session.GetString("UserId") != null)
            {
                string UserIDStr = HttpContext.Session.GetString("UserId");
                int UserID = Int32.Parse(UserIDStr);

                User userInDb = dbContext.Users.FirstOrDefault(u => u.UserId == UserID);

                IEnumerable<Wedding> Weddings = dbContext.Weddings
                                                    .Include(w => w.Rsvps)
                                                    .ToList();


                ViewBag.Weddings = Weddings;
                ViewBag.CurrUserId = userInDb.UserId;
                ViewBag.CurrUser = userInDb;

                return View();
            }
            else
            {
                return RedirectToAction("Index");
            }
        }

        [HttpGet("weddings/{weddingId}")]
        public IActionResult WeddingsShow(int weddingId)
        {
            Wedding weddingInDb = dbContext.Weddings
                                    .Include(w => w.Rsvps)
                                    .ThenInclude(r => r.User)
                                    .FirstOrDefault(w => w.WeddingId == weddingId);

            return View(weddingInDb);
        }

        [HttpGet("weddings/{weddingId}/cancel")]
        public IActionResult CancelWedding(int weddingId)
        {
            Wedding weddingInDb = dbContext.Weddings.FirstOrDefault(w => w.WeddingId == weddingId);

            dbContext.Weddings.Remove(weddingInDb);

            dbContext.SaveChanges();

            return RedirectToAction("Index");
        }

        [HttpGet("weddings/{weddingId}/rsvp")]
        public IActionResult RSVPForWedding(int weddingId)
        {
            string UserIDStr = HttpContext.Session.GetString("UserId");
            int UserID = Int32.Parse(UserIDStr);

            User userInDb = dbContext.Users.FirstOrDefault(u => u.UserId == UserID);

            Wedding weddingInDb = dbContext.Weddings.FirstOrDefault(w => w.WeddingId == weddingId);

            Rsvp newRsvp = new Rsvp(){ UserId = userInDb.UserId, WeddingId = weddingInDb.WeddingId };

            weddingInDb.Rsvps.Add(newRsvp);

            dbContext.SaveChanges();

            return RedirectToAction("Index");
        }

        [HttpGet("weddings/{weddingId}/unrsvp")]
        public IActionResult UbRSVPForWedding(int weddingId)
        {
            string UserIDStr = HttpContext.Session.GetString("UserId");
            int UserID = Int32.Parse(UserIDStr);

            Rsvp rsvpInDb = dbContext.Rsvps.FirstOrDefault(r => r.UserId == UserID && r.WeddingId == weddingId);

            dbContext.Rsvps.Remove(rsvpInDb);

            dbContext.SaveChanges();

            return RedirectToAction("Index");
        }

        [HttpGet("weddings/new")]
        public IActionResult NewWedding()
        {
            return View();
        }

        [HttpPost("PlanWedding")]
        public IActionResult PlanWedding(Wedding newWedding)
        {
            
            if(ModelState.IsValid)
            {
                string UserIDStr = HttpContext.Session.GetString("UserId");
                int UserID = Int32.Parse(UserIDStr);

                User userInDb = dbContext.Users.FirstOrDefault(u => u.UserId == UserID);

                newWedding.UserId = userInDb.UserId;
                dbContext.Add(newWedding);
                dbContext.SaveChanges();
                return RedirectToAction("WeddingsIndex");
            }
            else
            {
                if(newWedding.Date < DateTime.Now)
                {
                    ModelState.AddModelError("Date", "Date Must Be Planned for the Future");
                }                
                return View("NewWedding");
            }
        }

        [HttpGet("LogOut")]
        public IActionResult LogOut()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
