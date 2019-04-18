using System;
using System.ComponentModel.DataAnnotations;
 
namespace Wall.Models
{
	public class Comment
	{
	    [Key]
	    public int CommentId {get;set;}
	    [Required]
	    public string Content {get;set;}
	    [Required]
	    public int UserId {get;set;}
	    public int MessageId {get;set;}
	    public User User {get;set;}
	    public Message Message {get;set;}
	    public DateTime CreatedAt {get;set;} = DateTime.Now;
	    public DateTime UpdatedAt {get;set;} = DateTime.Now;
	} 
}