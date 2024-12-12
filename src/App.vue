<script setup lang="ts">
import SynopsisDiv from './components/SynopsisDiv.vue'

const lessons = [
  "How Can the Bible Help You?",
  "The Bible Gives Hope",
  "Can You Trust the Bible?",
  "Who Is God?",
  "The Bible Is God's Message to Us",
  "How Did Life Begin?",
  "What Is Jehovah Like?",
  "You Can Be Jehovah's Friend",
  "Draw Close to God Through Prayer",
  "How Can the Meetings of Jehovah's Witnesses Benefit You?",
  "How You Can Get the Most Out of the Bible",
  "What Will Help You to Keep Studying the Bible?",
  "Section 1 Review",
]
</script>

<template>
  <div id="regionHeader" class="jsLockedChrome">
    <div class="wrapper">
      <div class="wrapperShadow">
        <header id="siteHeader">
          <div id="siteLogo">
            <a href="https://vite.dev" target="_blank">
              <img src="/vite.svg" class="logo" alt="Vite logo" />
            </a>
          </div>
          <div class="siteNameContainer">
            <h2 id="siteName">Seiwa</h2>
          </div>
        </header>
      </div>
    </div>
  </div>
  <div id="regionMain">
    <div class="wrapper">
      <div class="wrapperShadow cms-clearfix">
        <main role="main" id="content" class="grid-layout--pub-sidebar grid-showLSR">
          <div class="main-wrapper">
            <figure id="articleTopRelatedImage" class="article-top-related-image textSizeIncrement dir-ltr" dir="ltr">
              <img src="./assets/trail.jpg" />
            </figure>
            <article id="article" dir="ltr" class="layout-reading layout-sidebar">
              <div class="textSizeIncrement">
                <h1>Enjoy Life Forever!—Introductory Bible Lessons</h1>
              </div>
              <p>This textbook is designed to be used during a personal Bible study as part of our free Bible study
                program.</p>
              <div class="toc cms-clearfix">
                <SynopsisDiv link="#" img-src="/vue-vite/src/assets/ipad.jpg"
                  text="How to get the most out of this Bible course" />
                <SynopsisDiv link="#" img-src="/vue-vite/src/assets/reading.jpg" text="Section 1" />
                <h2 class="pubviewsTOCSubsectionTitle">LESSONS</h2>
                <hr>
                <SynopsisDiv v-for="(text, index) in lessons" link="#"
                  img-src="/vue-vite/src/assets/open book.jpg" :title="'LESSON ' + (index + 1)"
                  :text="text" />
              </div>
            </article>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
