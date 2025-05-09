/******************************************************************************
 * WorksPage.jsx – hero + categories (back-aware)
 * rev-R-2 • 09 May 2025  (fixes final top-of-page drift)
 ******************************************************************************/

import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { useNavigationType } from "react-router-dom";
import WorksHero       from "../components/Works-hero";
import WorksCategories from "../components/Works-categories";

const WorksPage = () => {
  /* ---------------- state ---------------- */
  const [pageReady, setPageReady] = useState(false);

  /* ---------------- navigation meta ---------------- */
  const navType     = useNavigationType();          // POP | PUSH | REPLACE
  const returnId    = sessionStorage.getItem("returnToProjectId");
  const cameViaBack = navType === "POP" && !!returnId;

  /* ---------------- helper ---------------- */
  const centreCard = useCallback((id) => {
    if (!id) return;
    const attempt = (n = 0) => {
      const card = document.getElementById(`card-${id}`);
      if (card) {
        card.scrollIntoView({ block: "center", inline: "nearest", behavior: "instant" });
        sessionStorage.removeItem("returnToProjectId");
        return;
      }
      if (n < 100) setTimeout(() => attempt(n + 1), 50);
    };
    attempt();
  }, []);

  /* ---------------- first paint ---------------- */
  useLayoutEffect(() => {
    /* 1 ▸ force top before any paint */
    window.scrollTo(0, 0);

    /* 2 ▸ disable browser scroll-restore */
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    /* 3 ▸ body fade-in */
    document.body.style.opacity    = "0";
    document.body.style.transition = "opacity .25s ease";
    requestAnimationFrame(() => {
      document.body.style.opacity = "1";
      setPageReady(true);
    });

    /* 4 ▸ purge stale key unless this is truly a POP */
    if (navType !== "POP") sessionStorage.removeItem("returnToProjectId");

    return () => {
      document.body.style.opacity    = "";
      document.body.style.transition = "";
    };
  }, [navType]);

  /* ---------------- SECOND scroll-lock (post-layout) ---- */
  useEffect(() => {
    if (!cameViaBack) {
      /* Some engines restore scroll *after* first paint; clamp it again */
      const lock = setTimeout(() => window.scrollTo(0, 0), 0);   // ← line 86
      return () => clearTimeout(lock);
    }
  }, [cameViaBack]);

  /* ---------------- centre card on back ---------------- */
  useEffect(() => {
    if (pageReady && cameViaBack) centreCard(returnId);
  }, [pageReady, cameViaBack, returnId, centreCard]);

  /* ---------------- resize nudge (back-only) ----------- */
  useEffect(() => {
    if (!pageReady || !cameViaBack) return;                     // skip on reload
    const t1 = setTimeout(() => window.dispatchEvent(new Event("resize")), 120);
    const t2 = setTimeout(() => window.dispatchEvent(new Event("resize")), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [pageReady, cameViaBack]);                                 // line 118

  /* ---------------- render ---------------- */
  return (
    <div id="works" className={pageReady ? "works-page-loaded" : "works-page-loading"}>
      <WorksHero id="works-hero" noMotion={cameViaBack} />
      <WorksCategories isPageLoaded={pageReady} preserveState={cameViaBack} />
    </div>
  );
};

export default WorksPage;
