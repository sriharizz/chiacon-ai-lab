from pydantic import BaseModel, Field


class StrategicPhase(BaseModel):
    phase: str = Field(description="Phase label with timeframe, e.g. 'Phase 1: Quick Win (30 Days)'")
    title: str = Field(description="Punchy action title, max 8 words, e.g. 'Automated Report Generation & RPA'")
    description: str = Field(description="Exactly 2 short sentences. First sentence = the specific action. Second sentence = the measurable outcome. Max 30 words total.")
    key_technologies: list[str] = Field(description="Exactly 3 specific named tools or platforms. No vague categories like 'AI/ML'.")


class BusinessImpact(BaseModel):
    roi_metrics: list[str] = Field(description="Exactly 3 bullets. Each must include a percentage AND a dollar/time value. Max 12 words per bullet.")
    cost_of_inaction: list[str] = Field(description="Exactly 3 bullets. Each must name a specific business risk with a number. Max 12 words per bullet.")


class ConsultantResponse(BaseModel):
    executive_synthesis: str = Field(description="2-3 short sentences. Sentence 1: reframe the root cause. Sentence 2: name the AI opportunity. Sentence 3 (optional): ROI teaser. Max 40 words total.")
    strategic_roadmap: list[StrategicPhase] = Field(description="Exactly 3 phases: Quick Win (30 Days), Core Integration (90 Days), Transformation (6 Months).")
    business_impact: BusinessImpact


class GenerateRequest(BaseModel):
    business_problem: str
