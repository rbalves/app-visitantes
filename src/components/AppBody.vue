<template>
    <div>
        <AppHome
        :marginTopHome = marginTopBody
        />
        <!-- <AppListaVisitantes/> -->
        <AppCards/>
    </div>
</template>

<script>

import AppHome from './AppHome'
import AppListaVisitantes from './AppListaVisitantes'
import AppCards from './AppCards'

export default {
    props:['marginTopBody'],
    components: {
        AppHome,
        AppListaVisitantes,
        AppCards
    }
}
</script>
