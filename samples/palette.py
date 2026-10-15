from dataclasses import dataclass, field
import re

HEX = re.compile(r"^#[0-9a-f]{6}$", re.IGNORECASE)


@dataclass
class Palette:
    """A named set of colors."""

    name: str
    colors: dict[str, str] = field(default_factory=dict)

    def add(self, role: str, value: str) -> None:
        if not HEX.match(value):
            raise ValueError(f"Bad color for {role}: {value!r}")
        self.colors[role] = value.upper()

    @property
    def size(self) -> int:
        return len(self.colors)


if __name__ == "__main__":
    aureon = Palette("Aureon Dark")
    aureon.add("gold", "#e5b567")
    print(aureon.size, True, None)
