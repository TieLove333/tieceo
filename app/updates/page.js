'use client';

// Version: 1.0.2 - Enhanced styling with professional cards
import { useState, useEffect, useRef, useCallback } from 'react';
import Script from 'next/script';
import UpdateForm from './UpdateForm';
import AdminLogin from './AdminLogin';
import { Card, CardContent, CardHeader, CardTitle } from "../../src/components/ui/card";

export default function UpdatesPage() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [twitterScriptLoaded, setTwitterScriptLoaded] = useState(false);
  const updatesContainerRef = useRef(null);

  useEffect(() => {
    // Fetch updates from API
    const fetchUpdates = async () => {
      try {
        // Add cache-busting timestamp to prevent browser caching
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/updates?t=${timestamp}`);
        const data = await response.json();
        
        // Sort updates by date, newest first
        setUpdates(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching updates:', error);
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  // Function to process Twitter embeds
  const processTwitterEmbeds = useCallback(() => {
    if (window.twttr && window.twttr.widgets && updatesContainerRef.current) {
      console.log('Processing Twitter widgets...');
      
      // Select all blockquote elements with twitter-tweet class
      const twitterBlocks = updatesContainerRef.current.querySelectorAll('blockquote.twitter-tweet');
      
      twitterBlocks.forEach((block) => {
        try {
          // Attempt to create a widget for each tweet
          window.twttr.widgets.createTweet(
            block.getAttribute('data-tweet-id'),
            block.parentNode,
            {
              conversation: 'none',
              cards: 'hidden'
            }
          );
        } catch (error) {
          console.error('Error processing tweet:', error);
        }
      });
    }
  }, []);

  // Process Twitter embeds when updates are loaded or Twitter script is loaded
  useEffect(() => {
    // Ensure Twitter script is loaded and updates are present
    const loadTwitterWidgets = () => {
      if (window.twttr && window.twttr.widgets && !loading && updates.length > 0) {
        console.log('Attempting to load Twitter widgets...');
        processTwitterEmbeds();
      } else {
        // Retry loading if conditions aren't met
        setTimeout(loadTwitterWidgets, 1000);
      }
    };

    // Initial load attempt
    loadTwitterWidgets();

    // Cleanup function
    return () => {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      }
    };
  }, [loading, updates, processTwitterEmbeds]);

  const handleUpdateAdded = (newUpdate) => {
    setUpdates([newUpdate, ...updates]);
    // When a new update is added, reprocess Twitter embeds after a delay
    setTimeout(() => {
      if (twitterScriptLoaded) {
        processTwitterEmbeds();
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Twitter widgets script */}
      <Script 
        src="https://platform.twitter.com/widgets.js" 
        strategy="lazyOnload"
        onLoad={() => {
          console.log('Twitter script loaded');
          setTwitterScriptLoaded(true);
          // Attempt to process embeds immediately
          if (window.twttr && window.twttr.widgets) {
            processTwitterEmbeds();
          }
        }}
        onError={(e) => {
          console.error('Failed to load Twitter script', e);
        }}
      />

      <div className="hero container flex flex-col items-center justify-center text-center py-24 px-4">
        <h1 className="hero-title text-4xl font-bold mb-6 text-slate-800">
          The Journey So Far
        </h1>
        <p className="hero-description text-slate-600 mb-12 max-w-xl text-lg">
          Documenting every step of the $1B Solo SaaS Challenge
        </p>
      </div>

      <div 
        ref={updatesContainerRef}
        className="container max-w-3xl mx-auto px-4 py-8 space-y-16"
      >
        {loading ? (
          <div className="text-center text-slate-600 py-12 text-lg">
            <div className="animate-pulse">Loading updates...</div>
          </div>
        ) : updates.length === 0 ? (
          <div className="text-center text-slate-600 py-12 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-xl font-semibold mb-2">No updates yet</h3>
            <p>Stay tuned for the latest updates on our journey!</p>
          </div>
        ) : (
          updates.map((update) => (
            <div key={update.id} className="card-enhanced">
              <div className="card-header-enhanced">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="card-title-enhanced">{update.title}</h2>
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                    {update.category || 'General'}
                  </span>
                </div>
                <p className="card-date-enhanced">
                  {new Date(update.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="card-content-enhanced">
                <div 
                  className="prose" 
                  dangerouslySetInnerHTML={{ __html: update.content }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 