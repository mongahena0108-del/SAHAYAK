import React, {useState} from 'react';
import {refreshOfficialScheme} from '../services/tinyfish';

export function LiveOfficialCheck({scheme}) {
  const [state, setState] = useState({status: 'idle', data: null, error: ''});
  const refresh = async () => {
    setState({status: 'loading', data: null, error: ''});
    try { const data = await refreshOfficialScheme(scheme.url); setState({status: data.empty ? 'empty' : 'success', data, error: ''}); }
    catch (error) { setState({status: 'error', data: null, error: error.message}); }
  };
  return <section className={`live-check live-${state.status}`}>
    <div className="live-check-head"><div><div className="eyebrow">LIVE OFFICIAL-SOURCE CHECK</div><h2>Refresh official scheme information</h2></div><button className="outline" onClick={refresh} disabled={state.status === 'loading'}>{state.status === 'loading' ? 'Refreshing…' : 'Refresh now ↻'}</button></div>
    <p className="live-note">This retrieves page content from the stored official source. It does not verify your eligibility, confirm approval, or infer that an application window is open.</p>
    {state.status === 'idle' && <p className="live-state">Choose “Refresh now” to make one explicit live request. Nothing runs in the background.</p>}
    {state.status === 'loading' && <p className="live-state">Fetching the official page and extracting relevant passages…</p>}
    {state.status === 'empty' && <div className="live-empty"><b>The official page was reached, but no relevant passages were extracted.</b><span>Use the source link below to review the page directly. SAHAYAK’s stored details remain available above.</span><a href={state.data.sourceUrl} target="_blank" rel="noreferrer">Open source ↗</a></div>}
    {state.status === 'error' && <div className="live-error"><b>Could not refresh this source.</b><span>{state.error}</span><small>Your stored SAHAYAK scheme details remain available above.</small></div>}
    {state.status === 'success' && <div className="live-success"><div className="live-meta"><b>{state.data.title || 'Official source content'}</b><span>Retrieved {new Date(state.data.retrievedAt).toLocaleString()}</span><a href={state.data.sourceUrl} target="_blank" rel="noreferrer">{state.data.sourceUrl} ↗</a></div><div className="live-content"><b>Retrieved passages</b><p>{state.data.content}</p></div><small>Retrieved content is separate from SAHAYAK’s locally stored record. Verify dates, eligibility, terms, and availability with the authority.</small></div>}
  </section>;
}
