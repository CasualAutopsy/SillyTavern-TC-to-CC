import { registerSettingsListeners } from './listeners.js';
import { DEFAULT_SETTINGS } from './constants.js';

import { STContext as ctx } from '../external/st-context.js';

import settingsUI from '../ui/settings.html';
import '../ui/settings.css';

const { extensionSettings, saveSettingsDebounced } = ctx;

export async function initSettings() {
    $('#extensions_settings2').append(settingsUI);

    if (!extensionSettings.tc_to_cc)
        extensionSettings.tc_to_cc = DEFAULT_SETTINGS;

    saveSettingsDebounced();

    $('#tccc_exclude_body').prop('checked', extensionSettings.tc_to_cc.hide_textareas.exclude_body || false);
    $('#tccc_include_request').prop('checked', extensionSettings.tc_to_cc.hide_textareas.include_request || false);

    $('#tccc_filter_enabled').prop('checked', extensionSettings.tc_to_cc.filter_enabled || false);
    $('#tccc_filter_whitelist').prop('checked', extensionSettings.tc_to_cc.filter_whitelist || false);

    $('#tccc_filter_parameters').val(extensionSettings.tc_to_cc.filter_parameters || "").trigger('input');

    registerSettingsListeners();
}
