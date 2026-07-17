declare module 'jspdf/dist/jspdf.es.min.js' {
  export * from 'jspdf'
  const jsPDF: typeof import('jspdf').jsPDF
  export { jsPDF }
  export default jsPDF
}
