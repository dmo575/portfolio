# Introduction

I made this project a while ago. I was taking a class about basics of game engines at my University and decided that I would add everything that would cross my mind into it. This was the result.

# About the Linux version

The repo I'm linking contains the Linux version of the project. The original version was using some Windows only libraries for saving and loading in-game. This Linux version's in-game loading and saving does not work. You can however load any demo you want from the main menu, just don't try to save your progress. **I recommend hitting `Start` instead of loading the demos individually since that option will take you trough a small tutorial on what you on the demos.**

# About the project

Below is a list of features the engine has. Taken from [the original post I made about it on my previous portfolio.](https://arc-gameworks.webflow.io/programming/p-2dengine)

- Particles have their own, automatically managed pool.
- You can tweak particle systems to use basic shapes or sprites, one or various source particles, and more.
- Resource files are automatically managed: You don't have to worry about not loading a file more than once or deleting it after used.
- Visual collider/trigger debugger: You can draw them on screen to get a better idea of whats going on and see which state they are in.
- Simple console Logging system that tells you about errors or warnings and let you filter them or add your own message logs.
- Sprites use layers.
- Supports a a basic way of loading and managing more than one level. For example the pause menu you see in the video is its own level, loaded on top of the current level. Whenever we show it we load it and when we close it we unload it.
- There is a loading screen (just an image, no loading bar)
- Since you can change the delta time, you can create a pause menu.
- There are two event systems, one that runs at the end of update and one that triggers the event instantly.
- Basic save/load support.
- Several other features that escape me, mostly component level features that help you use the components in various ways (scaling, looping animations, animation clips, etc...)