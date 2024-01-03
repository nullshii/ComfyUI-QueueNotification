import { app } from "../../scripts/app.js";

app.registerExtension({
    name: "nullshii.QueueEndNotification",
    init() {
        app.ui.settings.addSetting({
            id: "nullshii.QueueEndNotification.NotificationSoundVolume",
            name: "Notification Sound Volume",
			type: "slider",
			attrs: {
				min: 0,
				max: 100,
			},
            defaultValue: 40,
        });

        let lastQueueSize = 0;
        const notificationAudio = new Audio("extensions/ComfyUI-QueueNotification/bell.mp3");
        
        // Watch lastQueueSize variable in UI
        Object.defineProperty(app.ui, "lastQueueSize", {
            get: () => lastQueueSize,
            set: (v) => {
                if (lastQueueSize > v) {
                    const notificationVolume = app.ui.settings.getSettingValue("nullshii.QueueEndNotification.NotificationSoundVolume", 40);

                    notificationAudio.volume = notificationVolume / 100;
                    notificationAudio.play();
                }

                lastQueueSize = v;
            }
        })
    }
});