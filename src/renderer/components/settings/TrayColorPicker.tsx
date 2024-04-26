/*
 * SPDX-License-Identifier: GPL-3.0
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2023 Vendicated and Vencord contributors
 */

import "./traySetting.css";

import { Margins } from "@vencord/types/utils";
import { findByCodeLazy } from "@vencord/types/webpack";
import { Forms } from "@vencord/types/webpack/common";
import { setCurrentState } from "renderer/patches/tray";

import { SettingsComponent } from "./Settings";

const ColorPicker = findByCodeLazy(".Messages.USER_SETTINGS_PROFILE_COLOR_SELECT_COLOR", ".BACKGROUND_PRIMARY)");

const presets = [
    "#3DB77F", // discord default ~
    "#F6BFAC" // Vesktop inpired
];

export const trayIconPicker: SettingsComponent = ({ settings }) => {
    if (!settings.tray) return null; // how to disable instead of hiding?
    return (
        <div className="tray-settings">
            <div className="tray-container">
                <div className="tray-settings-labels">
                    <Forms.FormTitle tag="h3">Tray Icon Color</Forms.FormTitle>
                    <Forms.FormText>Choose a color for your tray icon!</Forms.FormText>
                </div>
                <ColorPicker
                    color={parseInt(settings.trayColor ?? "#3DB77F", 16)}
                    onChange={newColor => {
                        const hexColor = newColor.toString(16).padStart(6, "0");
                        settings.trayColor = hexColor;
                        setCurrentState();
                    }}
                    showEyeDropper={false}
                    suggestedColors={presets}
                />
            </div>
            <Forms.FormDivider className={Margins.top20 + " " + Margins.bottom20} />
        </div>
    );
};