import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import DashboardHeader from "../../components/cine/dashboard/DashboardHeader.tsx";
import SettingsTabs from "../../components/cine/settings/SettingsTabs.tsx";
import GeneralSettings from "../../components/cine/settings/GeneralSettings.tsx";
import HallsSettings from "../../components/cine/settings/HallsSettings.tsx";
import HoursSettings from "../../components/cine/settings/HoursSettings.tsx";
import DangerZone from "../../components/cine/settings/DangerZone.tsx";

type SettingsTab = "general" | "halls" | "hours" | "media" | "danger";

export default function CineSettingsPage() {
    const { setSidebarOpen } = useOutletContext<{ setSidebarOpen: (v: boolean) => void }>();
    const [activeTab, setActiveTab] = useState<SettingsTab>("general");

    return (
        <>
            <DashboardHeader
                title="Paramètres"
                subtitle="Gérez les informations de votre cinéma"
                onMenuClick={() => setSidebarOpen(true)}
            />

            <main className="flex-1 p-4 md:p-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

                    <div className="min-h-[500px]">
                        {activeTab === "general" && <GeneralSettings />}
                        {activeTab === "halls" && <HallsSettings />}
                        {activeTab === "hours" && <HoursSettings />}
                        {activeTab === "danger" && <DangerZone />}
                    </div>
                </div>
            </main>
        </>
    );
}