// Temporary utility to update sample data dates
// This will be executed once to update all transaction dates

export const updateSampleDataDates = (content: string): string => {
  let updated = content;
  
  // Update dates in reverse order to avoid double replacements
  // 2025-10-XX -> 2025-11-XX
  updated = updated.replace(/2025-10-/g, '2025-11-');
  // 2025-09-XX -> 2025-10-XX  
  updated = updated.replace(/2025-09-/g, '2025-10-');
  // 2025-08-XX -> 2025-09-XX
  updated = updated.replace(/2025-08-/g, '2025-09-');
  
  // Update transaction IDs - Reynolds family (t_)
  updated = updated.replace(/t_202510/g, 't_202511');
  updated = updated.replace(/t_202509/g, 't_202510');
  updated = updated.replace(/t_202508/g, 't_202509');
  
  // Johnson family (tj_)
  updated = updated.replace(/tj_202510/g, 'tj_202511');
  updated = updated.replace(/tj_202509/g, 'tj_202510');
  updated = updated.replace(/tj_202508/g, 'tj_202509');
  
  // Austin family (ta_)
  updated = updated.replace(/ta_202510/g, 'ta_202511');
  updated = updated.replace(/ta_202509/g, 'ta_202510');
  updated = updated.replace(/ta_202508/g, 'ta_202509');
  
  // Phoenix family (tp_)
  updated = updated.replace(/tp_202510/g, 'tp_202511');
  updated = updated.replace(/tp_202509/g, 'tp_202510');
  updated = updated.replace(/tp_202508/g, 'tp_202509');
  
  return updated;
};

// Console log helper to run this manually
if (typeof window !== 'undefined') {
  (window as any).updateSampleDates = async () => {
    const response = await fetch('/src/utils/sampleData.ts');
    const content = await response.text();
    const updated = updateSampleDataDates(content);
    console.log('Updated content ready. Copy this:');
    console.log(updated);
    return updated;
  };
}
