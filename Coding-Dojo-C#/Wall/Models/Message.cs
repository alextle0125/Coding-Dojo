using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
 
namespace Wall.Models
{
	public class Message
	{
	    [Key]
	    public int MessageId {get;set;}
	    [Required]
	    public string Content {get;set;}
	    public List<Comment> Comments {get;set;}
	    public int UserId {get;set;}
	    public User User {get;set;}
	    public DateTime CreatedAt {get;set;} = DateTime.Now;
	    public DateTime UpdatedAt {get;set;} = DateTime.Now;
	} 
}