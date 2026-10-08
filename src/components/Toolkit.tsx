import React, { useState } from 'react';
import {
  TOOLKIT_IDEAS,
  TOOLKIT_CLIPS_TABLE,
  TOOLKIT_TROUBLESHOOTING,
  TOOLKIT_LIVE_CLASS_NOTES
} from '../data/playbookData';

type TabId = 'ideas' | 'clips' | 'fix' | 'class';

export const Toolkit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('ideas');

  return (
    <section className="toolkit" id="toolkit">
      <h2>Toolkit</h2>
      <p className="lead" style={{ margin: 0 }}>
        Quick reference for any stage.
      </p>
      <div className="tabs" role="tablist">
        <button
          className="tab"
          role="tab"
          aria-selected={activeTab === 'ideas'}
          type="button"
          onClick={() => setActiveTab('ideas')}
        >
          Idea starters
        </button>
        <button
          className="tab"
          role="tab"
          aria-selected={activeTab === 'clips'}
          type="button"
          onClick={() => setActiveTab('clips')}
        >
          Length → clips
        </button>
        <button
          className="tab"
          role="tab"
          aria-selected={activeTab === 'fix'}
          type="button"
          onClick={() => setActiveTab('fix')}
        >
          Troubleshooting
        </button>
        <button
          className="tab"
          role="tab"
          aria-selected={activeTab === 'class'}
          type="button"
          onClick={() => setActiveTab('class')}
        >
          For the live class
        </button>
      </div>

      <div className={`panel ${activeTab === 'ideas' ? 'active' : ''}`} role="tabpanel">
        <div className="ideas">
          {TOOLKIT_IDEAS.map((item, idx) => (
            <div className="idea" key={idx}>
              <b>{item.title}</b>
              <span>{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`panel ${activeTab === 'clips' ? 'active' : ''}`} role="tabpanel">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Video length</th>
                <th>Clips</th>
                <th>Structure</th>
              </tr>
            </thead>
            <tbody>
              {TOOLKIT_CLIPS_TABLE.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.length}</td>
                  <td>{row.clips}</td>
                  <td>{row.structure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`panel ${activeTab === 'fix' ? 'active' : ''}`} role="tabpanel">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Problem</th>
                <th>Fix</th>
              </tr>
            </thead>
            <tbody>
              {TOOLKIT_TROUBLESHOOTING.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.problem}</td>
                  <td>{row.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`panel ${activeTab === 'class' ? 'active' : ''}`} role="tabpanel">
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {TOOLKIT_LIVE_CLASS_NOTES.map((note, idx) => (
            <li key={idx} style={{ marginBottom: 6 }}>
              {note}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
