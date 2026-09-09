import { initSettings } from './core/settings.js';
import { registerListeners } from './core/listeners.js';
import { encodeHTMLString, removeParentHTML } from './core/utils.js';

import { STContext as ctx } from './external/st-context.js';

import dropdownUI from './ui/dropdown.html';
import './ui/dropdown.css';

const {
    extensionSettings,
    tcPresetManager
} = ctx;

/**
 * @import {} from '../global'
 */

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mut) => {
        if (mut.addedNodes.length) {
            mut.addedNodes.forEach((node) => {
                if (node instanceof HTMLDialogElement) {
                    const target = node.querySelector('#custom_include_body');
                    if (target) {
                        const dropdown_ui = encodeHTMLString(dropdownUI);

                        target.before(dropdown_ui);

                        if (extensionSettings.tc_to_cc.hide_textareas.exclude_body) {
                            removeParentHTML('#custom_exclude_body');
                        }
                        if (extensionSettings.tc_to_cc.hide_textareas.include_request) {
                            removeParentHTML('#custom_include_headers');
                        }

                        const preset_list = tcPresetManager.getAllPresets();
                        const dropdown_list = $('#tccc_presets');

                        preset_list.forEach((preset) => {
                            dropdown_list.append(`<option value="${preset}">${preset}</option>`);
                        });

                        registerListeners();
                    }
                }
            });
        }
    });
});

initSettings();

observer.observe(document.body, {
    childList: true,
});
