import { STContext as ctx } from '../external/st-context.js';
import { STLibs as libs } from '../external/st-libs.js';

const {
    extensionSettings, saveSettingsDebounced,
    tcPresetManager,
} = ctx;

const { yaml: YAML } = libs;

export async function registerListeners() {
    $('#tccc_append').on('click', () => {
        const payload = $('#custom_include_body').val();
        const tc_val = $('#tccc_presets').val();

        /** @type {Object} */
        let preset = tcPresetManager.getCompletionPresetByName(tc_val);

        if (
            extensionSettings.tc_to_cc.filter_enabled &&
            extensionSettings.tc_to_cc.filter_whitelist
        ) {
            /** @type {string[]} */
            const list = extensionSettings.tc_to_cc.filter_parameters.split('\n');

            preset = Object.fromEntries(
                Object.entries(preset).filter(([key]) => list.includes(key))
            );
        } else if (
            extensionSettings.tc_to_cc.filter_enabled
        ) {
            /** @type {string[]} */
            const list = extensionSettings.tc_to_cc.filter_parameters.split('\n');

            preset = Object.fromEntries(
                Object.entries(preset).filter(([key]) => !list.includes(key))
            );
        }

        const preset_yaml = YAML.stringify(preset);

        $('#custom_include_body').val(payload + '\n\n' + preset_yaml).trigger('input');
    });

    $('#tccc_overwrite').on('click', () => {
        const tc_val = $('#tccc_presets').val();

        /** @type {Object} */
        let preset = tcPresetManager.getCompletionPresetByName(tc_val);

        if (
            extensionSettings.tc_to_cc.filter_enabled &&
            extensionSettings.tc_to_cc.filter_whitelist
        ) {

            /** @type {string[]} */
            const list = extensionSettings.tc_to_cc.filter_parameters.split('\n');

            preset = Object.fromEntries(
                Object.entries(preset).filter(([key]) => list.includes(key))
            );
        }
        else if (
            extensionSettings.tc_to_cc.filter_enabled
        ) {

            /** @type {string[]} */
            const list = extensionSettings.tc_to_cc.filter_parameters.split('\n');

            preset = Object.fromEntries(
                Object.entries(preset).filter(([key]) => !list.includes(key))
            );
        }

        const preset_yaml = YAML.stringify(preset);

        $('#custom_include_body').val(preset_yaml).trigger('input');
    });
}

export async function registerSettingsListeners() {
    /** @type {Number} */
    const inactivity_interval = 800;
    /** @type {NodeJS.Timeout} */
    let typing_timer;

    $('#tccc_filter_parameters').on('input', () => {
        clearTimeout(typing_timer);

        typing_timer = setTimeout(() => {
            extensionSettings.tc_to_cc.filter_parameters =
                $('#tccc_filter_parameters').val();

            saveSettingsDebounced();
        }, inactivity_interval);
    });


    $('#tccc_exclude_body').on('click', () => {

        extensionSettings.tc_to_cc.hide_textareas.exclude_body =
            $('#tccc_exclude_body').prop('checked');

        saveSettingsDebounced();
    });

    $('#tccc_include_request').on('click', () => {

        extensionSettings.tc_to_cc.hide_textareas.include_request =
            $('#tccc_include_request').prop('checked');

        saveSettingsDebounced();
    });

    $('#tccc_filter_enabled').on('click', () => {

        extensionSettings.tc_to_cc.filter_enabled =
            $('#tccc_filter_enabled').prop('checked');

        saveSettingsDebounced();
    });

    $('#tccc_filter_whitelist').on('click', () => {

        extensionSettings.tc_to_cc.filter_whitelist =
            $('#tccc_filter_whitelist').prop('checked');

        saveSettingsDebounced();
    });
}
