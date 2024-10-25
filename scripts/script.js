"use strict";

const hamburgerOpen = document.querySelector(".hamburger__open");
const hamburgerClose = document.querySelector(".hamburger__close");
const mobileNav = document.querySelector(".page1__mobile__nav");
const faqContainer = document.querySelector(".page6__faq__container");
// const plusButton = document.querySelectorAll(".plus ");
const faqAnswer = document.querySelectorAll(".page6__faq--answer");

const faqQuestion = document.querySelectorAll(".page6__faq--question");

function smoothScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
smoothScroll();

// NAVIGATION TOGGLE
function navToggle() {
  hamburgerOpen.addEventListener("click", function (e) {
    const tl = gsap.timeline();
    tl.fromTo(
      ".hamburger__open",
      { rotate: 0 },
      {
        rotate: 360,
        duration: 0.6,
        ease: "power3.inout",
      }
    );
    tl.to(".page1__mobile__nav", {
      x: 0,
      duration: 0.6,
      ease: "power3.inout",
    });
  });

  hamburgerClose.addEventListener("click", function (e) {
    const tl = gsap.timeline();
    tl.fromTo(
      ".hamburger__close",
      { rotate: 0 },
      {
        rotate: 360,
        duration: 0.6,
        ease: "power3.inout",
      }
    );
    tl.to(".page1__mobile__nav", {
      x: "100%",
      duration: 0.6,
      ease: "power3.inout",
    });
  });
}

navToggle();

function faqToggle() {
  faqQuestion.forEach((qsn) => {
    qsn.addEventListener("click", () => {
      const answer = qsn.nextElementSibling;
      const plus = qsn.querySelector(".plus");

      // Collapse all other answers
      faqAnswer.forEach((ans) => {
        if (ans !== answer) {
          ans.style.height = "0px";
          ans.previousElementSibling.querySelector(".plus").style.transform =
            "rotate(0deg)";
        }
      });

      // Toggle the clicked answer
      if (answer.style.height === "0px" || answer.style.height === "") {
        answer.style.height = answer.scrollHeight + "px";
        plus.style.transform = "rotate(45deg)";
      } else {
        answer.style.height = "0px";
        plus.style.transform = "rotate(0deg)";
      }
    });
  });
}

faqToggle();
