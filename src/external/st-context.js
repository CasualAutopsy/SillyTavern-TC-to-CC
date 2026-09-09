/**
 * @import {} from '../../global'
 */

const {
    extensionSettings, saveSettingsDebounced,
    getPresetManager
} = SillyTavern.getContext();

const tcPresetManager = getPresetManager('textgenerationwebui');

export const STContext = {
    extensionSettings, saveSettingsDebounced,
    tcPresetManager,
};
