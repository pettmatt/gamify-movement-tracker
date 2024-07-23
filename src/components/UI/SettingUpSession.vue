<template>
    <h2>Setting up session</h2>
    
    <div>Sport category 
        <select name="SessionCategory" v-model="sessionDetails.category">
            <option value="running">Running</option>
            <option value="walking">Walking</option>
            <option value="cycling">Cycling</option>
            <option value="other">Other</option>
        </select>
    </div>
    <div>
        Specify session length goals <input type="checkbox" name="SpecifySessionLength" v-model="sessionDetails.specifySessionLength" />
    </div>

    <div v-show="sessionDetails.specifySessionLength">
        <div>
            Session time goal <input type="number" name="GoalTime" v-model="sessionDetails.goal.time" /> mins
        </div>
        <div>
            Session distance goal <input type="number" name="GoalDistance" v-model="sessionDetails.goal.distance" /> km
        </div>
        <div>
            Plan your route <button @click="planSessionRoute">Plan</button>
        </div>
    </div>

    <button @click="startSession">Start the session</button>
</template>

<script setup lang="ts">
import { currentTime } from "@/services/time-service"
import { sessionDetails, hudStore } from "@/stores/hud-store"

function planSessionRoute() {
    hudStore.placeMarkersStatus = !hudStore.placeMarkersStatus
}

function startSession() {
    sessionDetails.session.startingTime = currentTime()
    hudStore.sessionStartStatus = true
    hudStore.settingUpSessionStatus = false
}
</script>
