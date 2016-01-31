---
title: JavaScript doesn't mark the advent of the full-stack developer
author: Emanuel Kluge
layout: post.html
permalink: /ueberlegungen/javascript-doesnt-mark-the-advent-of-the-full-stack-developer/
categories:
  - JavaScript
  - Überlegungen
---

This is a rather unusual post as it is written in english. So don't be irritated by the fact that everything around here on this blog is in german. I switched the language for this post because I wanted to write a response to [an article on Smashing Magazine about Full-stack JavaScript][image]. Normally I would have just written a comment over at Smashing Magazine's, but this comment would have gotten way too long.

Also I want to shortly clarify my relationship to JavaScript. I'm working as a frontend developer for an agency in Hanover and I actually love writing JavaScript. In fact I have to love writing JavaScript as it is my main programming-/scripting-language. I'm quite familiar with PHP too and I wrote a little Python some time ago, but most of the time I'm writing JavaScript. And therefor I would get in real trouble if I started to hate writing it.

So what's wrong with this article on Full-stack JavaScript? Actually it's overall a good post and provides a wide overview on the topic. But beside the fact, that I disagree with the author when he states that asynchronous, callback-based code is easier to read and understand than synchronous (linearly written) code (e.g. PHP), I don't like the announcement of the "Full-stack-JacaScript-developer-dude/-dudess" he implicitly makes.

It's correct that it is easily possible to to have an application (client and server) fully running on JavaScript. But in my perception Alejandro Hernandez negates the fact that there still exist two different environments, though they both run the same language. And these environments provide different requirements to the developer. On the client-side it's about creating a user experience, dealing with user interaction and device deficiencies. Sure, with client-side-rendering and -routing formerly unusual tasks arrived on the client-side, but IMHO that doesn't equate client- and server-side programming.

On the server-side again there are tasks that could easily be located on the client-side (e. g. SQLite is implemented on both sides of the wire), but that's only a small part of the tasks a common server-side progammer is confronted with. There are way more things to do with data than fetching it from/writing it to a database. This is the kind of computer-sience-stuff a frontend developer has few to nothing to do with with when she's juggling HTML, CSS and JavaScript in the presence of various browser quirks.

That's why I think it's risky to suggest that there could prospectively be one kind of developer that is writing the full stack in JavaScript. And I think Alejandro Hernandez is exactly doing this in his article.

TL;DR

Though client and server are nowadays able to run the same programming language, I think there won't arise a new species of full-stack developer that addresses all the requirements issued by these two environments. Though there is an overlap in tasks and some people out there have a really broad understanding of various JavaScript-driven environments, the common case will be a specialized developer that does reliable work either on either the client- or the server-side.

[image]: http://coding.smashingmagazine.com/2013/11/21/introduction-to-full-stack-javascript/
