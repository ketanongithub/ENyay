export function getCurrentLanguage(): string {
    if (abp.localization.currentLanguage.name) {
        return abp.localization.currentLanguage.name;
    }

    return 'en';
}
