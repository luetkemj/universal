# Development Log

## 180722 - Nuke Redux from orbit and upgrade all the things.

The goal is to have a universal web app with React and Apollo. To begin I chose to clone [dylants/universal](https://github.com/dylants/universal) which is a great starting point for a React / Redux universal web app.

The first step in the transformation was to remove react-router-config and redux. The router was rewritten with components as opposed to a config file and the entire react-routes pattern was removed.

I chose to yank out all state management, hydration, server side fetching, etc. Some of the manual implementation here is taken care of for you with various apollo packages, others will need to be reimplemented. We'll cross that bridge when we get there.

During the initial gutting of the app I removed HMR so next up was replacing that.

Run tests. eeew...

Remove all reducer and action tests - no more redux more reducers and actions. Yay?

Might as well nuke the state lib and it's test as well...

HandlehttpError lib function uses react-router-redux to redirect the user on 401. Yoink. Without redux that function is a no go but redirects like that should be handled at the component level with React Router 4.

Don't need the store anymore - there really is a lot of setup with Redux. Curious how Apollo will compare. Right now it looks great! So much less code when 0 Apollo implementation has been executed.

With the new de-reduxified app running great it's time to upgrade to webpack 4. Much easier than expected. Some plugins we used that are rolled in by default now. Setting the mode. And replacing ExtractTextPlugin with MiniCssExtractPlugin. Not bad really.

Finally a full upgrade of dependencies. Used [npm-check](https://www.npmjs.com/package/npm-check) module which is quite nice. Yarn was giving me guffins.

Some final tweaks and several builds to convince myself it all works and I'm ready for the next phase. Apollo!
