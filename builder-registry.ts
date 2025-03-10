"use client";
import { builder, Builder, withChildren } from "@builder.io/react";
import BarChart from "./app/components/purity/Charts/BarChart";
import Counter from "./app/components/Counter/Counter";
import DashboardStatCard from "./app/components/purity/Card/DashboardStatCard";
import DashboardStats from "./app/components/dashboard/DashboardStats";
import Footer from "./app/components/dashboard/Footer";
import IconBox from "./app/components/purity/Icons/IconBox";
import LineChart from "./app/components/purity/Charts/LineChart";
import MiniStatistics from "./app/components/purity/Card/MiniStatistics";
import { Providers } from "./app/providers";
import { Providers } from "./app/providers 2";
import { StatsCard } from "./app/components/dashboard/StatsCard";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(BarChart, {
  name: "BarChart",
  inputs: [
    {
      name: "data",
      type: "object",
      hideFromUI: true,
      meta: {
        ts: "any[]",
      },
      required: true,
    },
    {
      name: "options",
      type: "string",
      meta: {
        ts: "any",
      },
      required: true,
    },
  ],
});

Builder.registerComponent(Counter, {
  name: "Counter",
  inputs: [
    {
      name: "initialCount",
      type: "number",
    },
  ],
});

Builder.registerComponent(Builder, {
  name: "Builder",
});

Builder.registerComponent(withChildren(DashboardStatCard), {
  name: "DashboardStatCard",
  inputs: [
    {
      name: "chart",
      type: "string",
      hideFromUI: true,
      meta: {
        ts: "ReactNode",
      },
      required: true,
    },
    {
      name: "title",
      type: "string",
      required: true,
    },
  ],
});

Builder.registerComponent(withChildren(IconBox), {
  name: "IconBox",
  inputs: [
    {
      name: "bg",
      type: "string",
    },
    {
      name: "h",
      type: "string",
    },
    {
      name: "icon",
      type: "string",
      hideFromUI: true,
      meta: {
        ts: "ReactNode",
      },
      required: true,
    },
    {
      name: "w",
      type: "string",
    },
  ],
});

Builder.registerComponent(LineChart, {
  name: "LineChart",
  inputs: [
    {
      name: "data",
      type: "object",
      hideFromUI: true,
      meta: {
        ts: "any[]",
      },
      required: true,
    },
    {
      name: "options",
      type: "string",
      meta: {
        ts: "any",
      },
      required: true,
    },
  ],
});

Builder.registerComponent(withChildren(MiniStatistics), {
  name: "MiniStatistics",
  inputs: [
    {
      name: "amount",
      type: "string",
      required: true,
    },
    {
      name: "icon",
      type: "string",
      hideFromUI: true,
      meta: {
        ts: "ReactNode",
      },
      required: true,
    },
    {
      name: "percentage",
      type: "number",
    },
    {
      name: "title",
      type: "string",
      required: true,
    },
  ],
});

Builder.registerComponent(withChildren(Providers), {
  name: "Providers",
  inputs: [
    {
      name: "children",
      type: "string",
      hideFromUI: true,
      meta: {
        ts: "ReactNode",
      },
    },
  ],
});

Builder.registerComponent(DashboardStats, {
  name: "DashboardStats",
  inputs: [
    {
      name: "stats",
      type: "object",
      hideFromUI: true,
      meta: {
        ts: "{ money: string; users: number; clients: number; sales: string; }",
      },
      required: true,
    },
  ],
});

Builder.registerComponent(Footer, {
  name: "Footer",
});

Builder.registerComponent(StatsCard, {
  name: "StatsCard",
  inputs: [
    {
      name: "change",
      type: "string",
      required: true,
    },
    {
      name: "changeType",
      type: "string",
      enum: ["negative", "positive"],
      required: true,
    },
    {
      name: "className",
      type: "string",
    },
    {
      name: "icon",
      type: "string",
      required: true,
    },
    {
      name: "title",
      type: "string",
      required: true,
    },
    {
      name: "value",
      type: "string",
      required: true,
    },
  ],
});

Builder.registerComponent(withChildren(Providers), {
  name: "Providers",
  inputs: [
    {
      name: "children",
      type: "string",
      hideFromUI: true,
      meta: {
        ts: "ReactNode",
      },
    },
  ],
});
