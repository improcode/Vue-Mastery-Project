<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>

    <EventCard v-for="event in event.events" :key="event.id" :event="event"/>

    <router-link v-if="page != 1" :to="{ name: 'event-list', query: {page: page - 1}}" rel="prev">previous page</router-link> | 
    <router-link v-if="page < lastPage" :to="{ name: 'event-list', query: {page: page + 1}}" rel="prev">next page</router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'EventsList',
  components: { EventCard },
  data() {
    return {
      perPage: 3
    }
  },
  created() {
    // dlaczego przykład w tym stylu nie działa?
    // this.$store.dispatch('fetchEvents').then(() => { this.events = this.$store.state.events})
    this.$store.dispatch('event/fetchEvents', {perPage: this.perPage, page: this.page})
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    lastPage() {
      return Math.ceil(this.event.eventsTotal / this.perPage)
    },
    ...mapState(['event', 'user'])
    }
    // dlaczego tu trzeba użyć spread operatora?

}
</script>

<style>
</style>
