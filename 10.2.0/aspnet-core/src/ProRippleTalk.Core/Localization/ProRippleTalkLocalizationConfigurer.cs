using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace ProRippleTalk.Localization;

public static class ProRippleTalkLocalizationConfigurer
{
    public static void Configure(ILocalizationConfiguration localizationConfiguration)
    {
        localizationConfiguration.Sources.Add(
            new DictionaryBasedLocalizationSource(ProRippleTalkConsts.LocalizationSourceName,
                new XmlEmbeddedFileLocalizationDictionaryProvider(
                    typeof(ProRippleTalkLocalizationConfigurer).GetAssembly(),
                    "ProRippleTalk.Localization.SourceFiles"
                )
            )
        );
    }
}
