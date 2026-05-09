using System.ComponentModel.DataAnnotations;

namespace ProRippleTalk.Users.Dto;

public class ChangeUserLanguageDto
{
    [Required]
    public string LanguageName { get; set; }
}