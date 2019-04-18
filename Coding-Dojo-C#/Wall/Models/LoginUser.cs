using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Wall.Models
{
	public class LoginUser
	{
	    // No other fields!
	    public string Email {get; set;}
	    [DataType(DataType.Password)]
	    public string Password { get; set; }
	}
}