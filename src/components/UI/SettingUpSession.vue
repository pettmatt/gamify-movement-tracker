<template>
<h2>Setting up session</h2>

<div>Sport category 
    <select name="SessionCategory" v-model="sessionCategory">
        <option value="running">Running</option>
        <option value="walking">Walking</option>
        <option value="cycling">Cycling</option>
        <option value="other">Other</option>
    </select>
</div>
<div>
    Plan your route <button @click="planSessionRoute">Plan</button>
</div>
<div>
    Specify session length goals <input type="checkbox" name="SpecifySessionLength" v-model="specifySessionLength" />
</div>

<div v-show="specifySessionLength">
    <div>
        Session time goal <input type="number" name="GoalTime" v-model="goalTime" /> mins
    </div>
    <div>
        Session distance goal <input type="number" name="GoalDistance" v-model="goalDistance" /> km
    </div>
</div>

<button @click="startSession">Start the session</button>
</template>

<script setup lang="ts">
import { sessionDetails, sessionStore } from "@/stores/hud-store"
import { ref } from "vue";

const specifySessionLength = ref(false)
const goalTime = ref(20)
const goalDistance = ref(2.5)
const sessionCategory = ref("")

function toggleSpecifySessionLength() {
    specifySessionLength.value = !specifySessionLength.value
}
function planSessionRoute() {
    sessionStore.placeMarkersStatus = !sessionStore.placeMarkersStatus
}
function handleSessionCategory(e: any) {
    console.log("handleSessionCategory event value", e)
    sessionCategory.value = e.value
}

function startSession() {
    sessionDetails.category = sessionCategory.value
    sessionDetails.goal.lengthSpecified = specifySessionLength.value

    if (specifySessionLength.value) {
        sessionDetails.goal.distance = goalDistance.value
        sessionDetails.goal.time = goalTime.value
    }
}
</script>