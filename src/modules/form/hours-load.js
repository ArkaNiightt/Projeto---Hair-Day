import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours";
import { hoursClick } from "./hours-click";

const hours = document.getElementById("hours");

export function hoursLoad({ date, dailySchedules }) {
    // Limpa a lista de horarios
    hours.innerHTML = "";

    // Obtem a lista de todos os horarios ocupados
    const unavailableHours = dailySchedules.map((schedule) =>
        dayjs(schedule.when).format("HH:mm")
    );

    const opening = openingHours.map((hour) => {
        // Recupera somente a hora

        const [scheduleHour] = hour.split(":");

        // Adicona a hora na data e verifica se está no passado.
        const isHourPast = dayjs(date)
            .add(scheduleHour, "hour")
            .isBefore(dayjs());

        const available = !unavailableHours.includes(hour) && !isHourPast;

        return {
            hour,
            available,
        };
    });

    // Renderiza os horarios
    opening.forEach(({ hour, available }) => {
        if (hour === "9:00") {
            hourHeaderAdd("Manhã");
        } else if (hour === "13:00") {
            hourHeaderAdd("Tarde");
        } else if (hour === "18:00") {
            hourHeaderAdd("Noite");
        }
    
        const li = document.createElement("li");
        li.classList.add("hour");
        li.classList.add(available ? "hour-available" : "hour-unavailable");
        li.textContent = hour;
        hours.append(li);
        
    });

    // Adiciona o evento de clique nos horarios disponiveis
    hoursClick();
}

function hourHeaderAdd(title) {
    const header = document.createElement("li");
    header.classList.add("hour-period");
    header.textContent = title;

    hours.append(header);
}
