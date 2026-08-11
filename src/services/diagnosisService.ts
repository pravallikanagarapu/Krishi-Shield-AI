export interface DiagnosisResult {
  crop: string
  disease: string
  confidence: number
  severity: string
  symptoms: string[]
  actions: string[]
}

interface DiagnosisResponse {
  success: boolean
  diagnosis?: DiagnosisResult
  message?: string
}

export async function diagnoseLeaf(
  image: string,
  crop: string,
): Promise<DiagnosisResult> {
  const response = await fetch(
    "https://krishi-shield-ai-backend.onrender.com/api/diagnose",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        image,
        crop,
      }),
    },
  )

  if (!response.ok) {
    throw new Error(
      "Unable to connect to the diagnosis service",
    )
  }

  const data: DiagnosisResponse =
    await response.json()

  if (!data.success || !data.diagnosis) {
    throw new Error(
      data.message || "Diagnosis failed",
    )
  }

  return data.diagnosis
}
