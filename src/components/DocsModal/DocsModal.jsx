import React, { useState } from 'react';
import { docsData } from '../../data/docsData';
import { sounds } from '../../utils/audio';
import { copyToClipboard } from '../../utils/helpers';
import { X, Terminal, Copy, Check, ShieldCheck, Sparkles, BookOpen, Layers } from 'lucide-react';
import './DocsModal.css';

export default function DocsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('architecture'); // 'architecture', 'tokens', 'shortcuts', 'terminal'
  const [copiedToken, setCopiedToken] = useState(null);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: 'YATHARTH.DEV // SYSTEM DOCS TERMINAL v2.6.4' },
    { type: 'system', text: 'Type "help" for a list of available commands.' }
  ]);

  if (!isOpen) return null;

  const handleCopy = async (tokenName) => {
    sounds.playClick();
    const ok = await copyToClipboard(tokenName);
    if (ok) {
      setCopiedToken(tokenName);
      setTimeout(() => setCopiedToken(null), 2000);
    }
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    sounds.playClick();
    const newHistory = [...terminalHistory, { type: 'user', text: `$ ${terminalInput}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'response',
          text: 'COMMANDS: about, projects, skills, contact, clear, date, whoami, tokens'
        });
        break;
      case 'whoami':
        newHistory.push({
          type: 'response',
          text: 'Yatharth Jaiswal — Web Developer. Location: Unnao / Kanpur, UP, India. BCA @ Rama University (2027).'
        });
        break;
      case 'about':
        newHistory.push({
          type: 'response',
          text: 'Web Developer with 6 months industry experience at PixeloLabs, specializing in responsive layouts and up to 70% page speed optimization.'
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'response',
          text: '01 Backyard Breaks (backyardbreaks.com) | 02 InfiniWell (infiniwell.com)'
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'response',
          text: 'HTML5, CSS3, JavaScript (ES6+), React.js, Git/GitHub, VS Code, Speed Optimization, SEO, Cross-Browser Compatibility'
        });
        break;
      case 'contact':
        newHistory.push({
          type: 'response',
          text: 'Email: yatharthjai789@gmail.com | Location: India | GitHub: @Yatharth-Jaiswal | LinkedIn: /in/yatharth-jaiswal-b24656360/'
        });
        break;
      case 'date':
        newHistory.push({
          type: 'response',
          text: `SYSTEM TIME: ${new Date().toISOString()}`
        });
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: "${cmd}". Type "help" for valid commands.`
        });
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  return (
    <div className="docs-modal-backdrop" onClick={onClose}>
      <div 
        className="docs-modal-container" 
        onClick={(e) => e.stopPropagation()}
        data-cursor="default"
      >
        {/* Header */}
        <div className="docs-modal-header">
          <div className="docs-header-left">
            <div className="docs-header-badge">DOCS</div>
            <div className="docs-header-info">
              <span className="docs-header-title">ENGINEERING SPECIFICATION</span>
              <span className="docs-header-version">{docsData.systemOverview.version}</span>
            </div>
          </div>
          <button 
            type="button" 
            className="docs-close-btn"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            data-cursor="link"
            aria-label="Close documentation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="docs-tabs-nav">
          <button
            type="button"
            className={`docs-tab-btn ${activeTab === 'architecture' ? 'is-active' : ''}`}
            onClick={() => {
              sounds.playClick();
              setActiveTab('architecture');
            }}
          >
            ARCHITECTURE
          </button>
          <button
            type="button"
            className={`docs-tab-btn ${activeTab === 'tokens' ? 'is-active' : ''}`}
            onClick={() => {
              sounds.playClick();
              setActiveTab('tokens');
            }}
          >
            DESIGN TOKENS
          </button>
          <button
            type="button"
            className={`docs-tab-btn ${activeTab === 'shortcuts' ? 'is-active' : ''}`}
            onClick={() => {
              sounds.playClick();
              setActiveTab('shortcuts');
            }}
          >
            SHORTCUTS
          </button>
          <button
            type="button"
            className={`docs-tab-btn ${activeTab === 'terminal' ? 'is-active' : ''}`}
            onClick={() => {
              sounds.playClick();
              setActiveTab('terminal');
            }}
          >
            TERMINAL
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="docs-modal-body">
          {activeTab === 'architecture' && (
            <div className="docs-tab-pane">
              <div className="docs-pane-section">
                <span className="docs-sec-tag">// OVERVIEW</span>
                <p className="docs-lead-text">
                  The portfolio is engineered with an emphasis on low cognitive load, microsecond input responsiveness, and mathematical geometric balance.
                </p>
              </div>

              <div className="docs-layers-list">
                {docsData.systemOverview.architecture.map((layer, idx) => (
                  <div key={idx} className="docs-layer-item">
                    <span className="layer-item-title">{layer.layer}</span>
                    <p className="layer-item-desc">{layer.desc}</p>
                  </div>
                ))}
              </div>

              <div className="docs-rules-section">
                <span className="docs-sec-tag">// ENGINEERING RULES</span>
                <div className="docs-rules-grid">
                  {docsData.engineeringRules.map((rule, idx) => (
                    <div key={idx} className="rule-box">
                      {rule}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tokens' && (
            <div className="docs-tab-pane">
              <div className="docs-pane-section">
                <span className="docs-sec-tag">// CSS CUSTOM PROPERTIES</span>
                <p className="docs-lead-text">
                  Click any token below to copy its CSS variable expression.
                </p>
              </div>

              <div className="tokens-table">
                {docsData.designTokens.map((t, idx) => (
                  <div 
                    key={idx} 
                    className="token-row"
                    onClick={() => handleCopy(t.token)}
                    data-cursor="copy"
                  >
                    <div className="token-left">
                      <span className="token-name">{t.token}</span>
                      <span className="token-desc">{t.description}</span>
                    </div>
                    <div className="token-right">
                      <code className="token-value">{t.value}</code>
                      {copiedToken === t.token ? (
                        <Check size={14} className="token-check-icon" />
                      ) : (
                        <Copy size={14} className="token-copy-icon" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'shortcuts' && (
            <div className="docs-tab-pane">
              <div className="docs-pane-section">
                <span className="docs-sec-tag">// GLOBAL HOTKEYS</span>
              </div>
              <div className="shortcuts-table">
                {docsData.keyboardShortcuts.map((s, idx) => (
                  <div key={idx} className="shortcut-row">
                    <kbd className="shortcut-key">{s.key}</kbd>
                    <span className="shortcut-action">{s.action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'terminal' && (
            <div className="docs-tab-pane terminal-pane">
              <div className="terminal-logs">
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className={`term-line term-${item.type}`}>
                    {item.text}
                  </div>
                ))}
              </div>
              <form onSubmit={handleTerminalSubmit} className="terminal-prompt-form">
                <span className="term-symbol">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type a command (e.g. 'help', 'skills', 'contact')..."
                  className="terminal-input-field"
                  autoFocus
                />
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="docs-modal-footer">
          <span className="docs-footer-status">SYSTEM INTEGRITY: 100% // 0 LOG ERRORS</span>
          <span className="docs-footer-date">COMPILED 2026</span>
        </div>

      </div>
    </div>
  );
}
