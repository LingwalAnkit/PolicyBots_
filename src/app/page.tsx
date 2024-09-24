"use client"
import React from "react";
import { Header } from "../section/header";
import { Hero } from "../section/hero";
import SectionOne from "../section/sectionOne";
import Footer  from "../section/footer";


export default function Home() {
return(
    <>
        <Header></Header>
        <Hero></Hero>
        <SectionOne></SectionOne>
        <Footer></Footer>
    </>
)
}