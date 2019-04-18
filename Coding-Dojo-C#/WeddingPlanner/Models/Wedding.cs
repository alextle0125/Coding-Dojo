using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
 
namespace WeddingPlanner.Models
{
	public class Wedding
	{
	    [Key]
	    public int WeddingId {get;set;}
	    [Required]
	    public string Partner1 {get;set;}
	    [Required]
	    public string Partner2 {get;set;}
	    [Required]
	    public DateTime Date {get;set;}
	    [Required]
	    public string Address {get;set;}
	    public int UserId {get;set;}
	    public List<Rsvp> Rsvps {get;set;} = new List<Rsvp>();
	    public DateTime CreatedAt {get;set;} = DateTime.Now;
	    public DateTime UpdatedAt {get;set;} = DateTime.Now;
	} 
}