using ProRippleTalk.Debugging;

namespace ProRippleTalk;

public class ProRippleTalkConsts
{
    public const string LocalizationSourceName = "ProRippleTalk";

    public const string ConnectionStringName = "Default";

    public const bool MultiTenancyEnabled = true;


    /// <summary>
    /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
    /// </summary>
    public static readonly string DefaultPassPhrase =
        DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "4e54dd295478426dae5bd2a20ae8fc80";
}
