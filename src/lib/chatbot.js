import { useEffect, useState } from 'react';

const ChatbotIntegration = () => {
  const [isChatbotLoaded, setIsChatbotLoaded] = useState(false);

  useEffect(() => {
    if (!isChatbotLoaded) {
      const loadBotpress = () => {
        const script = document.createElement('script');
        script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          const configScript = document.createElement('script');
          configScript.src = 'https://mediafiles.botpress.cloud/c8a1ffdc-e1b8-42bc-9e42-028c32066dd9/webchat/config.js';
          configScript.async = true;
          document.body.appendChild(configScript);

          configScript.onload = () => {
            if (window.botpressWebChat) {
              window.botpressWebChat.init({
                hideWidget: true, // Hide the widget by default
                disableAnimations: true, // Disable animations to prevent flickering
              });
              console.log('Botpress WebChat initialized successfully');
              setIsChatbotLoaded(true);
            } else {
              console.error('Botpress WebChat is still not available after loading scripts');
            }
          };
        };
      };

      loadBotpress();
    }

    return () => {
      // Cleanup function to remove the scripts when component unmounts
      if (isChatbotLoaded) {
        const scripts = document.querySelectorAll('script[src*="botpress"]');
        scripts.forEach(script => script.remove());
        if (window.botpressWebChat) {
          window.botpressWebChat.sendEvent({ type: 'hide' });
        }
      }
    };
  }, [isChatbotLoaded]);

  return null;
};

export default ChatbotIntegration;