using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
 
namespace WeddingPlanner.Models
{
	public class User
	{
	    [Key]
	    public int UserId {get;set;}
	    [Required]
	    public string FirstName {get;set;}
	    [Required]
	    public string LastName {get;set;}
	    [EmailAddress]
	    [Required]
	    public string Email {get;set;}
	    [DataType(DataType.Password)]
	    [Required]
	    [MinLength(8, ErrorMessage="Password must be 8 characters or longer!")]
	    public string Password {get;set;}
	    public DateTime CreatedAt {get;set;} = DateTime.Now;
	    public DateTime UpdatedAt {get;set;} = DateTime.Now;
	    public List<Rsvp> Rsvps {get;set;}
	    // Will not be mapped to your users table!
	    [NotMapped]
	    [Compare("Password", ErrorMessage="Passwords must match")]
	    [DataType(DataType.Password)]
	    public string PasswordConfirm {get;set;}
	    public string ToString()
	    {
	    	return String.Format("<Entity: User> FirstName: {0}, LastName: {1}, Email: {2}, Password: {3}, CreatedAt: {4}, UpdatedAt: {5}", FirstName, LastName, Email, Password, CreatedAt, UpdatedAt);
	    }
	} 
}