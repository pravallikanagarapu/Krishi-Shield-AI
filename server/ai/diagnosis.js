const diseaseKnowledge = {
  Tomato: {
    "Early Blight": {
      symptoms: [
        "Circular brown lesions on leaves",
        "Yellowing around affected areas",
        "Older leaves usually show symptoms first",
      ],
      severity: "Moderate",
      actions: [
        "Remove severely affected leaves",
        "Avoid overhead irrigation",
        "Improve airflow around plants",
      ],
    },

    "Late Blight": {
      symptoms: [
        "Dark irregular lesions",
        "Rapid leaf deterioration",
        "Water-soaked appearance under humid conditions",
      ],
      severity: "High",
      actions: [
        "Remove heavily infected plant material",
        "Avoid working with wet foliage",
        "Monitor surrounding plants closely",
      ],
    },
  },

  Rice: {
    "Leaf Blast": {
      symptoms: [
        "Spindle-shaped lesions",
        "Gray centers with darker margins",
        "Lesions may expand rapidly under favorable conditions",
      ],
      severity: "High",
      actions: [
        "Monitor nearby plants",
        "Avoid excessive nitrogen application",
        "Follow local agronomic treatment guidance",
      ],
    },
  },

  Chilli: {
    "Leaf Spot": {
      symptoms: [
        "Small circular spots",
        "Brown or dark lesions",
        "Progressive leaf damage",
      ],
      severity: "Moderate",
      actions: [
        "Remove heavily affected leaves",
        "Maintain field sanitation",
        "Avoid prolonged leaf wetness",
      ],
    },
  },
}

export function createDemoDiagnosis(crop = "Tomato") {
  const cropData = diseaseKnowledge[crop] || diseaseKnowledge.Tomato

  const diseaseNames = Object.keys(cropData)
  const disease = diseaseNames[0]

  const result = cropData[disease]

  return {
    crop,
    disease,
    confidence: 91,
    severity: result.severity,
    symptoms: result.symptoms,
    actions: result.actions,
  }
}