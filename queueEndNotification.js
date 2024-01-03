import { app } from "../../scripts/app.js";

app.registerExtension({
    name: "nullshii.QueueEndNotification",
    init() {
        // Add setting
        app.ui.settings.addSetting({
            id: "nullshii.QueueEndNotification.EnableNotificationSound",
            name: "Enable Notification Sound",
            type: "boolean",
            tooltip: "Play sound when generation queue ends.",
            defaultValue: true,
        });

        let lastQueueSize = 0;
        const notificationAudio = new Audio("bell.mp3");
        
        // Watch lastQueueSize variable in UI
        Object.defineProperty(app.ui, "lastQueueSize", {
            get: () => lastQueueSize,
            set: (v) => {
                const isNotificationEnabled = app.ui.settings.getSettingValue("nullshii.QueueEndNotification.EnableNotificationSound", true);
                if (lastQueueSize > v && isNotificationEnabled) {
                    notificationAudio.play();
                }

                lastQueueSize = v;
            }
        })
    }
});