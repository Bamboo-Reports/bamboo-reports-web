"""Shared GCC classification rules.

Single definition used by both the company-page importer
(scripts/gcc/import-accounts.py) and the tracker directory generator
(scripts/tracker/generate-static-accounts.py), so the /gcc directory and the
company pages always agree on what counts as a GCC center.
"""

# Center types surfaced first on the page, in this order; anything else
# follows by center count. The lead city is the top type's busiest city.
TYPE_PRIORITY = ["GBS", "SSC", "R&D", "CoE", "GCC/GIC", "Engineering & Design", "IT"]

# Non-GCC center types. These are excluded from the headline center count, the
# city list and the type labels, so "N centers" reflects true GCC centers only
# (R&D, IT, GBS, CoE, GCC/GIC, Engineering, SSC), not manufacturing/sales/
# distribution sites. If a company has ONLY non-GCC centers we fall back to the
# full set so the record still renders.
NON_GCC_TYPES = {"Manufacturing", "Sales & Marketing", "Distribution"}

# Center types that stay upper/mixed-case in prose (acronyms). Everything else
# (e.g. "Engineering & Design") is lowercased to read naturally in a sentence.
ACRONYM_TYPES = {"GBS", "SSC", "R&D", "CoE", "GCC/GIC", "IT", "BPO"}

# Center status value that marks an operating center in warehouse exports.
ACTIVE_CENTER_STATUS = "Active Center"


def gcc_centers(centers, get_type):
    """Apply the true-GCC rule to a list of center records.

    get_type(center) must return the cleaned center_type string (may be "").
    Returns the centers whose type is not a non-GCC type; if that leaves
    nothing (all centers are non-GCC types), returns the full list unchanged.
    """
    kept = [c for c in centers if get_type(c) not in NON_GCC_TYPES]
    return kept if kept else list(centers)
