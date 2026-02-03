import { jsPDF } from "jspdf";
import type { AnalysisResult, SymptomData } from "@/components/AnalysisSection";

interface ReportData {
  results: AnalysisResult;
  symptoms?: SymptomData;
  fileName?: string;
  patientId?: string;
}

export const generatePdfReport = ({ results, symptoms, fileName, patientId }: ReportData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let yPos = 20;

  // Helper functions
  const addText = (text: string, size: number, style: "normal" | "bold" = "normal", color: [number, number, number] = [0, 0, 0]) => {
    doc.setFontSize(size);
    doc.setFont("helvetica", style);
    doc.setTextColor(...color);
  };

  const drawLine = (y: number, color: [number, number, number] = [200, 200, 200]) => {
    doc.setDrawColor(...color);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
  };

  const checkPageBreak = (requiredSpace: number) => {
    if (yPos + requiredSpace > doc.internal.pageSize.getHeight() - 30) {
      doc.addPage();
      yPos = 20;
      return true;
    }
    return false;
  };

  // Header with gradient effect simulation
  doc.setFillColor(37, 99, 235); // Primary blue
  doc.rect(0, 0, pageWidth, 45, "F");
  
  doc.setFillColor(99, 102, 241); // Gradient effect
  doc.rect(0, 0, pageWidth / 2, 45, "F");

  // Logo/Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("RespiraNet", margin, 25);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("AI-Powered Respiratory Health Analysis", margin, 35);

  // Report ID and Date
  doc.setFontSize(9);
  const reportId = `RPT-${Date.now().toString(36).toUpperCase()}`;
  const reportDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  doc.text(`Report ID: ${reportId}`, pageWidth - margin - 60, 25);
  doc.text(reportDate, pageWidth - margin - 60, 35);

  yPos = 60;

  // Medical Disclaimer Banner
  doc.setFillColor(254, 243, 199); // Warning yellow
  doc.roundedRect(margin, yPos, contentWidth, 20, 3, 3, "F");
  doc.setFontSize(8);
  doc.setTextColor(146, 64, 14);
  doc.setFont("helvetica", "bold");
  doc.text("⚠ MEDICAL DISCLAIMER", margin + 5, yPos + 7);
  doc.setFont("helvetica", "normal");
  const disclaimer = "This report is for educational purposes only and is not a substitute for professional medical diagnosis. Always consult a healthcare provider.";
  doc.text(disclaimer, margin + 5, yPos + 14, { maxWidth: contentWidth - 10 });

  yPos += 30;

  // Patient/File Information Section
  if (fileName || patientId) {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, yPos, contentWidth, 25, 3, 3, "F");
    
    addText("", 10, "bold", [71, 85, 105]);
    doc.text("Analysis Details", margin + 5, yPos + 8);
    
    addText("", 9, "normal", [100, 116, 139]);
    if (fileName) {
      doc.text(`Audio File: ${fileName}`, margin + 5, yPos + 18);
    }
    if (patientId) {
      doc.text(`Patient ID: ${patientId}`, margin + contentWidth / 2, yPos + 18);
    }
    
    yPos += 35;
  }

  // Primary Diagnosis Section
  doc.setFillColor(239, 246, 255); // Light blue
  doc.roundedRect(margin, yPos, contentWidth, 40, 3, 3, "F");
  
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text("PRIMARY ASSESSMENT", margin + 5, yPos + 10);
  
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(37, 99, 235);
  doc.text(results.primaryDiagnosis, margin + 5, yPos + 28);
  
  // Confidence badge
  const confidenceColors: Record<string, [number, number, number]> = {
    high: [34, 197, 94],
    medium: [234, 179, 8],
    low: [239, 68, 68],
  };
  const confColor = confidenceColors[results.confidence] || [100, 116, 139];
  doc.setFillColor(...confColor);
  doc.roundedRect(pageWidth - margin - 45, yPos + 20, 40, 12, 2, 2, "F");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text(`${results.confidence.toUpperCase()} CONF.`, pageWidth - margin - 43, yPos + 28);

  yPos += 50;

  // Disease Probability Distribution
  addText("DISEASE PROBABILITY DISTRIBUTION", 11, "bold", [30, 41, 59]);
  doc.text("DISEASE PROBABILITY DISTRIBUTION", margin, yPos);
  yPos += 8;
  drawLine(yPos);
  yPos += 10;

  results.predictions.forEach((pred) => {
    checkPageBreak(25);
    
    // Condition name and percentage
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text(pred.condition, margin, yPos);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(`${(pred.probability * 100).toFixed(1)}%`, pageWidth - margin - 20, yPos);
    
    // Progress bar
    yPos += 5;
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(margin, yPos, contentWidth - 30, 6, 2, 2, "F");
    
    // Get color from hex or use default
    const barWidth = (contentWidth - 30) * pred.probability;
    if (pred.condition === "Normal") {
      doc.setFillColor(34, 197, 94);
    } else if (pred.condition === "Pneumonia") {
      doc.setFillColor(239, 68, 68);
    } else if (pred.condition === "Asthma") {
      doc.setFillColor(234, 179, 8);
    } else if (pred.condition === "COPD") {
      doc.setFillColor(59, 130, 246);
    } else {
      doc.setFillColor(139, 92, 246);
    }
    doc.roundedRect(margin, yPos, barWidth, 6, 2, 2, "F");
    
    // Reasoning
    if (pred.reasoning) {
      yPos += 10;
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(`↳ ${pred.reasoning}`, margin + 5, yPos, { maxWidth: contentWidth - 40 });
    }
    
    yPos += 12;
  });

  yPos += 5;

  // Clinical Notes
  if (results.clinicalNotes) {
    checkPageBreak(50);
    
    addText("CLINICAL ANALYSIS NOTES", 11, "bold", [30, 41, 59]);
    doc.text("CLINICAL ANALYSIS NOTES", margin, yPos);
    yPos += 8;
    drawLine(yPos);
    yPos += 10;
    
    doc.setFillColor(248, 250, 252);
    const notesHeight = Math.ceil(results.clinicalNotes.length / 90) * 5 + 15;
    doc.roundedRect(margin, yPos, contentWidth, notesHeight, 3, 3, "F");
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    const lines = doc.splitTextToSize(results.clinicalNotes, contentWidth - 10);
    doc.text(lines, margin + 5, yPos + 8);
    
    yPos += notesHeight + 10;
  }

  // Recommendations
  if (results.recommendations && results.recommendations.length > 0) {
    checkPageBreak(50);
    
    addText("RECOMMENDATIONS", 11, "bold", [30, 41, 59]);
    doc.text("RECOMMENDATIONS", margin, yPos);
    yPos += 8;
    drawLine(yPos);
    yPos += 10;
    
    doc.setFillColor(236, 253, 245); // Light green
    const recHeight = results.recommendations.length * 12 + 10;
    doc.roundedRect(margin, yPos, contentWidth, recHeight, 3, 3, "F");
    
    doc.setFontSize(9);
    doc.setTextColor(22, 101, 52);
    
    results.recommendations.forEach((rec, index) => {
      doc.text(`${index + 1}. ${rec}`, margin + 5, yPos + 8 + index * 12, { maxWidth: contentWidth - 10 });
    });
    
    yPos += recHeight + 10;
  }

  // Audio Features Analysis
  checkPageBreak(60);
  
  addText("AUDIO SPECTRAL FEATURES", 11, "bold", [30, 41, 59]);
  doc.text("AUDIO SPECTRAL FEATURES", margin, yPos);
  yPos += 8;
  drawLine(yPos);
  yPos += 10;

  const featureBoxWidth = (contentWidth - 10) / 3;
  const features = [
    { label: "Zero Crossing Rate", value: results.audioFeatures.zcr.toFixed(4), unit: "" },
    { label: "Spectral Centroid", value: results.audioFeatures.spectralCentroid.toFixed(0), unit: "Hz" },
    { label: "Harmonic Energy", value: (results.audioFeatures.harmonicEnergy * 100).toFixed(1), unit: "%" },
  ];

  features.forEach((feature, index) => {
    const xPos = margin + index * (featureBoxWidth + 5);
    
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(xPos, yPos, featureBoxWidth, 35, 3, 3, "F");
    
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(feature.label, xPos + 5, yPos + 10);
    
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text(`${feature.value}${feature.unit}`, xPos + 5, yPos + 26);
  });

  yPos += 50;

  // Symptoms Summary (if provided)
  if (symptoms) {
    checkPageBreak(60);
    
    addText("REPORTED SYMPTOMS", 11, "bold", [30, 41, 59]);
    doc.text("REPORTED SYMPTOMS", margin, yPos);
    yPos += 8;
    drawLine(yPos);
    yPos += 10;

    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, yPos, contentWidth, 45, 3, 3, "F");

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);

    const symptomsList = [
      `Fever: ${symptoms.fever ? "Yes" : "No"}`,
      `Chest Pain: ${symptoms.chestPain ? "Yes" : "No"}`,
      `Wheezing: ${symptoms.wheezing ? "Yes" : "No"}`,
      `Cough Type: ${symptoms.coughType || "Not specified"}`,
      `Shortness of Breath: ${symptoms.shortnessOfBreath || "Not specified"}`,
      `Duration: ${symptoms.duration || "Not specified"}`,
    ];

    const col1 = symptomsList.slice(0, 3);
    const col2 = symptomsList.slice(3);

    col1.forEach((item, index) => {
      doc.text(item, margin + 5, yPos + 10 + index * 12);
    });

    col2.forEach((item, index) => {
      doc.text(item, margin + contentWidth / 2, yPos + 10 + index * 12);
    });

    yPos += 55;
  }

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 20;
  drawLine(footerY - 5, [200, 200, 200]);
  
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text("Generated by RespiraNet AI • This document is for informational purposes only", margin, footerY);
  doc.text(`Page 1 of ${doc.getNumberOfPages()}`, pageWidth - margin - 25, footerY);

  // Add page numbers to all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 25, footerY);
  }

  // Save the PDF
  const pdfFileName = `RespiraNet-Report-${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(pdfFileName);
  
  return pdfFileName;
};
